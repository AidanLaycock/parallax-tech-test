<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Device;
use App\Models\Import;
use Inertia\Inertia;

class DeviceController extends Controller
{
    /**
     * Display all devices for user management
     */
    public function index(Request $request)
    {
        return Inertia::render('Devices/index', [
            'devices' => Device::all(),
            'imports' => Import::all()
        ]);
    }
}
