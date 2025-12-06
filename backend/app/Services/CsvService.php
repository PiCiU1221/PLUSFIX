<?php

namespace App\Services;

use App\Models\Show;
use App\Models\StreamingPlatform;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;

class CsvService
{
    public function writeShowsExport($handle): void
    {
        $allPlatforms = StreamingPlatform::pluck('name')->toArray();
        $headerRow = array_merge(['', '', ''], $allPlatforms);
        fputcsv($handle, $headerRow);

        fputcsv($handle, []);

        Show::with('streamingPlatforms')
            ->cursor()
            ->each(function ($show) use ($handle) {
                $row = [
                    $show->id,
                    $show->title,
                    '-',
                ];

                $showPlatforms = $show->streamingPlatforms->pluck('name')->toArray();
                $row = array_merge($row, $showPlatforms);

                fputcsv($handle, $row);
            });
    }

    public function importShowsCsv(UploadedFile $file): void
    {
        $path = $file->getRealPath();
        $handle = fopen($path, 'r');

        if (!$handle) {
            throw new \Exception("Could not open the file.");
        }

        $headerRow = fgetcsv($handle);
        if (!$headerRow) {
            throw new \Exception("File is empty.");
        }

        $declaredPlatforms = array_values(array_filter(array_slice($headerRow, 3), fn($v) => !empty(trim($v))));

        fgetcsv($handle);

        $showsData = [];
        $allUsedPlatforms = [];

        $rowNumber = 3;
        while (($row = fgetcsv($handle)) !== false) {
            if (empty(array_filter($row))) {
                continue;
            }

            $showId = trim($row[0]);

            $rowPlatforms = [];
            for ($i = 3; $i < count($row); $i++) {
                $pName = trim($row[$i]);
                if (!empty($pName)) {
                    $rowPlatforms[] = $pName;
                    $allUsedPlatforms[$pName] = true;
                }
            }

            if (empty($rowPlatforms)) {
                throw new \Exception("Row {$rowNumber} (ID: {$showId}) has no streaming platforms assignment.");
            }

            foreach ($rowPlatforms as $p) {
                if (!in_array($p, $declaredPlatforms)) {
                    throw new \Exception("Row {$rowNumber} uses platform '{$p}' which is removed from the header row.");
                }
            }

            $showsData[] = [
                'id' => $showId,
                'platforms' => $rowPlatforms
            ];

            $rowNumber++;
        }
        fclose($handle);

        foreach ($declaredPlatforms as $declared) {
            if (!isset($allUsedPlatforms[$declared])) {
                throw new \Exception("Platform '{$declared}' is declared in the header but not assigned to any show.");
            }
        }

        DB::transaction(function () use ($showsData, $allUsedPlatforms) {
            $csvPlatformNames = array_keys($allUsedPlatforms);

            StreamingPlatform::whereNotIn('name', $csvPlatformNames)->delete();

            $platformNameMap = [];

            foreach ($csvPlatformNames as $name) {
                $platform = StreamingPlatform::firstOrCreate(['name' => $name]);
                $platformNameMap[$name] = $platform->id;
            }

            foreach ($showsData as $data) {
                $show = Show::find($data['id']);

                if (!$show) {
                    throw new \Exception("Show with ID {$data['id']} not found in database.");
                }

                $platformIds = array_map(fn($name) => $platformNameMap[$name], $data['platforms']);

                $show->streamingPlatforms()->sync($platformIds);
            }
        });
    }
}
