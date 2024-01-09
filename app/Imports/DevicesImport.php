<?php

namespace App\Imports;

use App\Models\Device;
use Maatwebsite\Excel\Concerns\ToModel;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\WithHeadingRow;


class DevicesImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new device([
            'name' => $row['name'],
            'address' => $row['address'],
            'longitude' => $row['longitude'],
            'latitude' => $row['latitude'],
            'device_type' => $row['device_type'],
            'manufacturer' => $row['manufacturer'],
            'model' => $row['model'],
            'install_date' => Carbon::createFromFormat('m/d/Y', $row['install_date']), //$row['install_date'], 
            'note' => $row['notes'],
            'eui' => $row['eui'],
            'serial_number' => $row['serial_number']
        ]);
    }
}
