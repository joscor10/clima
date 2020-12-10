import React,{Fragment,useState,useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
  const [busqueda,setBusqueda]= useState({
    ciudad:'',
    pais:''
  });

  const [consultar,setConsultar]=useState(false);
  const [resultado,setResultado]= useState({});
  const [error,setError]= useState(false);
  const {ciudad,pais}= busqueda;

  useEffect(()=>{
    if(consultar){
      const consultarAPI= async ()=>{
        const appId="a127794a079a78bc9f337196f0a05d88";
        const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respusta = await fetch(url);
        const resultado= await respusta.json();
   
        setResultado(resultado);
        setConsultar(false);
        if(resultado.cod==="404"){
          setError(true);
        }else{
            setError(false);
        }
      
      }
      consultarAPI();
    }
   
    // eslint-disable-next-line
  },[consultar])
let component;
 if(error){ 
   component=<Error mensaje="No hay resultados"/>
 }else{
   component= <Clima   resultado={resultado} />
 }
  return (
    <Fragment>
      <Header
          titulo='Clima App'
      />
     <div className="contenedor-form">
            <div className="container">
                <div className="row">
                    <div className="col m6 s12">
                        <Formulario 
                          busqueda={busqueda}
                          setBusqueda={setBusqueda}
                          setConsultar={setConsultar}
                        />
                    </div>
                    <div className="col m6 s12">
                       {component}
                    </div>
                </div>
            </div>
        </div>

    </Fragment>
  );
}

export default App;
