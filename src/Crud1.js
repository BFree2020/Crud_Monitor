import React from "react";
import "./Crud1.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";
import {collection, addDoc} from "firebase/firestore";
import {db} from  "./firebase"


const data = [
  {id: 1, 
  nombre: "Iván",
  apellido: "Castiblanco",
  programa: "Programación",
  semestre: "6",
  cedula: 8055210,
  contacto: 310202020,
  materia: "Estadística",
  fecha: "02/10/2022",
  salon: "A3"
  }
];


class App extends React.Component {
 state={
   data: data,
   form: {
     id: '', 
    nombre: '',
    apellido: '',
    programa: '',
    semestre: '',
    cedula: '',
    contacto: '',
    materia: '',
    fecha: '',
    salon: ''
    },
    modalInsertar: false,
    modalEditar: false,
 };

 handleChange=e=>{
 this.setState({
   form:{
     ...this.state.form,
     [e.target.name]: e.target.value,
   }
 });
 }

 mostrarModalInsertar=()=>{
   this.setState({modalInsertar: true});
 }

 ocultarModalInsertar=()=>{
  this.setState({modalInsertar: false});
}

mostrarModalEditar=(registro)=>{
  this.setState({modalEditar: true, form: registro});
}

ocultarModalEditar=()=>{
 this.setState({modalEditar: false});
}


insertar=()=>{
  var valorNuevo={...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista=this.state.data;
  lista.push(valorNuevo);
  this.setState({data: lista, modalInsertar: false});
}

editar=(dato)=>{
  var contador=0;
  var lista=this.state.data;
  lista.map((registro)=>{
    if(dato.id===registro.id){
    lista[contador].nombre=dato.nombre;
    lista[contador].apellido=dato.apellido;
    lista[contador].programa=dato.programa;
    lista[contador].semestre=dato.semestre;
    lista[contador].cedula=dato.cedula;
    lista[contador].contacto=dato.contacto;
    lista[contador].materia=dato.materia;
    lista[contador].fecha=dato.fecha;
    lista[contador].salon=dato.salon;

    }
    contador++;
  });
  this.setState({data: lista, modalEditar: false});
}

eliminar=(dato)=>{
  var opcion=window.confirm("Esta seguro de eliminar el registro "+dato.id);
  if(opcion){
    var contador=0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(registro.id===dato.id){
        lista.splice(contador, 1);
      }
      contador++;
    })  
    this.setState({data: lista});
  }
}

  render(){
    return(
      <>
     
      <Container>
      <br />
      <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Ingresar Monitor</Button>
      <br /><br />

      <Table>
        <thead><tr><th>Id</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Programa</th>
        <th>Semestre</th>
        <th>Cédula</th>
        <th>Contacto</th>
        <th>Materia</th>
        <th>Fecha</th>
        <th>Salón</th>
        <th>Acciones</th></tr></thead>
        <tbody>
          {this.state.data.map((element)=>(
            <tr>
              <td>{element.id}</td>
              <td>{element.nombre}</td>
              <td>{element.apellido}</td>
              <td>{element.programa}</td>
              <td>{element.semestre}</td>
              <td>{element.cedula}</td>
              <td>{element.contacto}</td>
              <td>{element.materia}</td>
              <td>{element.fecha}</td>
              <td>{element.salon}</td>

              <td><Button color="primary" onClick={()=>this.mostrarModalEditar(element)}>Editar</Button>
              {"  "}
              <Button color="danger" onClick={()=>this.eliminar(element)}>Eliminar</Button></td>
            </tr>
          ))}
     
          
        </tbody>
      </Table>
      </Container>

     <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.nombre}/>
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input className="form-control" name="apellido" type="text" onChange={this.handleChange} value={this.state.form.apellido}/>
            </FormGroup>

            <FormGroup>
              <label>
                Programa: 
              </label>
              <input className="form-control" name="programa" type="text" onChange={this.handleChange} value={this.state.form.programa}/>
            </FormGroup>

            <FormGroup>
              <label>
                Semestre: 
              </label>
              <input className="form-control" name="semestre" type="text" onChange={this.handleChange} value={this.state.form.semestre}/>
            </FormGroup>

            <FormGroup>
              <label>
                Cédula: 
              </label>
              <input className="form-control" name="cedula" type="text" onChange={this.handleChange} value={this.state.form.cedula}/>
            </FormGroup>

            <FormGroup>
              <label>
                Contacto: 
              </label>
              <input className="form-control" name="contacto" type="text" onChange={this.handleChange} value={this.state.form.contacto}/>
            </FormGroup>

            <FormGroup>
              <label>
                Materia: 
              </label>
              <input className="form-control" name="materia" type="text" onChange={this.handleChange} value={this.state.form.materia}/>
            </FormGroup>

            <FormGroup>
              <label>
                Fecha: 
              </label>
              <input className="form-control" name="fecha" type="text" onChange={this.handleChange} value={this.state.form.fecha}/>
            </FormGroup>

            <FormGroup>
              <label>
                Salon: 
              </label>
              <input className="form-control" name="salon" type="text" onChange={this.handleChange} value={this.state.form.salon}/>
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>

        </Modal>

       <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Ingresar Información</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange}/>
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input className="form-control" name="apellido" type="text" onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>
                Programa: 
              </label>
              <input className="form-control" name="programa" type="text" onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>
                Semestre: 
              </label>
              <input className="form-control" name="semestre" type="text" onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>
                Cédula: 
              </label>
              <input className="form-control" name="cedula" type="text" onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>
                Contacto: 
              </label>
              <input className="form-control" name="contacto" type="text" onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Materia: 
              </label>
              <input className="form-control" name="materia" type="text" onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha: 
              </label>
              <input className="form-control" name="fecha" type="text" onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Salon: 
              </label>
              <input className="form-control" name="salon" type="text" onChange={this.handleChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
            <Button colo="danger" onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
      

export default App;
