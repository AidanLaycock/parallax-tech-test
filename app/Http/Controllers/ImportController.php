<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImportRequest;
use App\Models\Import;
use App\Imports\DevicesImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class ImportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImportRequest $request)
    {
        Storage::put($request->validated('file')->name, $request->validated('file'));
        
        $import = Import::create(
            [
                'filename' => $request->validated('file')->name,
                'user_id' => Auth::user()->id
            ]
        );

        $devices = Excel::import(new DevicesImport($import->id), $request->validated('file'));

        $import->update([
            'completed_at' => Carbon::now()
        ]);

        return response()->json([
            'message' => 'File imported successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(import $import)
    {
        $import->delete();

        Storage::delete($import->filename);

        return response()->json([
            'message' => 'Import deleted successfully.'
        ]);
    }
}
