"use client"
import { useEffect, useState } from "react";
import empanada from "./empandas";
import { Tiro_Tamil } from "next/font/google";

export default function Home() {
  let [empanadas, setEmpanadas] = useState([]);
  let [sabor, setSabor] = useState('');
  let [cantidad, setCantidad] = useState(0);
  let [total, setTotal] = useState(0);

  const renderizarEmpanadas = () => (
    <table className="w-full border-collapse border border-gray-600">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="p-2">Sabor</th>
          <th className="p-2">Cantidad</th>
          <th className="p-2">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {empanadas.map((empanada, index) => (
          <tr key={index} className="text-center">
            <td className="p-2">{empanada.obtenerSabor()}</td>
            <td className="p-2">{empanada.obtenerCantidad()}</td>
            <td className="p-2 cursor-pointer" onClick={() => eliminarEmpanada(index)}>x</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const data = () => {
    return (
      <table className="w-20 h-20 m-10 border-collapse border border-gray-600">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="p-2 cursor-pointer">{total}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  const handleEmpanada = () => {
    const nuevaEmpanada = new empanada(sabor, cantidad);
    const empanadaExistente = empanadas.find((e) => e.obtenerSabor() === sabor);
    let q = parseInt(total, 10) + parseInt(cantidad, 10)
    setTotal(q)
    if (empanadaExistente) {
      // Clonar el array y actualizar la cantidad en la empanada existente
      setEmpanadas((prevEmpanadas) => {
        const updatedEmpanadas = prevEmpanadas.map((e) => {
          if (e.obtenerSabor() === sabor) {
            // Clonar la empanada y actualizar la cantidad
            let c = parseInt(e.obtenerCantidad(), 10) + parseInt(cantidad, 10);
            return new empanada(e.obtenerSabor(), c);
          }
          return e;
        });
        return updatedEmpanadas;
      });
    } else {
      // Agregar una nueva empanada al array
      setEmpanadas([...empanadas, nuevaEmpanada]);
    }
    console.log(empanadas);
  };

  useEffect(() => {
    console.log(empanadas);
  }, [empanadas]);

  const eliminarEmpanada = (index) => {
    setEmpanadas((prevEmpanadas) => {
      const updatedEmpanadas = [...prevEmpanadas.slice(0, index), ...prevEmpanadas.slice(index + 1)];
      return updatedEmpanadas;
    });
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl">Empanady</h1>
      <div className='bg-gray-400 w-full min-h-96 p-10 flex flex-col items-center'>
        <div className="flex bg-gray-800 justify-between">
          <select
            className="m-4 p-4 bg-gray-900 text-white"
            value={sabor}
            onChange={(e) => setSabor(e.target.value)}
          >
            <option> Seleccione el sabor </option>
            <option value="jamonYQueso">Jamon y Queso</option>
            <option value="carne">Carne</option>
            <option value="carneCortada">Carne cortada a cuchillo</option>
            <option value="carnePicante">Carne picante</option>
            <option value="pancetaCiruela">Panceta y ciruela</option>
            <option value="pollo">Pollo</option>
            <option value="polloPicante">Pollo picante</option>
            <option value="verdura">Verdura</option>
            <option value="bondiola">Bondiola</option>
            <option value="cabutia">Cabutia</option>
            <option value="roquefort">Roquefort</option>
            <option value="caprese">Caprese</option>
          </select>
          <input
            className="m-4 p-4 bg-gray-900 text-white"
            placeholder="Ingrese la cantidad"
            type="number"
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-900 w-40 m-4 h-10 text-white"
          onClick={() => handleEmpanada()}
        >Agregar</button>
        <div className="flex items-center flex-col justify-center">
          <div className="flex flex-row ">
            {empanadas.length > 0 ? (
              <div className="bg-gray-700 w-96 max-h-screen p-10 overflow-auto">
                {renderizarEmpanadas()}
              </div>
            ) : (
              <div>
                <p>No hay empanadas en el listado</p>
              </div>
            )}
            {empanadas.length > 0 ? data() : null}
          </div>
        </div>
      </div>
    </main>
  )
}