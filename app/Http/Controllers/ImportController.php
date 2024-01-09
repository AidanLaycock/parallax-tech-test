<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImportRequest;
use App\Models\Import;


use App\Imports\DevicesImport;
use Maatwebsite\Excel\Facades\Excel;

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
        $import = Excel::import(new DevicesImport, $request->validated('file'));
        
        return response()->json([
            'message' => 'File imported successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(import $import)
    {
        //
    }
}
