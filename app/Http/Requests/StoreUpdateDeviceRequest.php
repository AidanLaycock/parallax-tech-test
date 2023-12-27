<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateDeviceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'address' => 'required|string',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
            'device_type' => 'required|string',
            'manufacturer' => 'required|string',
            'model' => 'required|string',
            'install_date' => 'required|date',
            'note' => 'required|string',
            'eui' => 'required|string',
            'serial_number' => 'required|string',
        ];
    }
}
