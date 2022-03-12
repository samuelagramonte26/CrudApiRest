<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $personas = Persona::all(['id', 'nombre', 'apellido', 'edad', 'sexo']);
        return response()->json($personas, 200);
    }

  

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
       $rules= [
            'nombre'=>'required',
            'apellido'=>'required',
            'edad'=>'required',
            'sexo'=>'required'
        ];
        $messages = [
            'nombre.required'=>'El nombre es requerido',
            'apellido.required'=>'El apellido requerido',
            'edad.required'=>'La edad es requerida',
            'sexo.required'=>'El sexo es requerido'

        ];
        $validator = validator($request->all(),$rules,$messages);
        if($validator->fails()){
           // $persona = Persona::create($request->only('nombre','apellido','edad','sexo'));
            return response()->json($validator->errors()->all(),406);
        }else{
            $persona = Persona::create($request->only('nombre','apellido','edad','sexo'));
            return response()->json(['Mensaje'=>'Insertado con Exito'],200);
        }
      
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = Persona::find($id);
        if (is_null($result)) {
            return response(['Mensaje' => 'No se pudo encontrar'], 404);
        } else {
            return response()->json($result,200);
        }
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Persona $persona)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function destroy(Persona $persona)
    {
        //
    }
}
