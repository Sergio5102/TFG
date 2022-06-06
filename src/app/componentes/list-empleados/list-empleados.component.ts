import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  constructor(private empleadoService: EmpleadoService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getEmpleados();
  }
  //Método para obtener un listado de todos los empleados.
  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),

        })
      });
      console.log(this.empleados)
    })
  }
  //Método para eliminar un empleado
  eliminarEmpleado(id: string) {
    swal.fire({
      title: 'Estas seguro?',
      text: "No podras deshacer estre proceso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.eliminarEmpleado(id).then(() => {
          console.log('Empleado eliminado con exito');
          //this.toastr.error('El empleado fue eliminado con exito', 'Empleado eliminado')
        }).catch(error => {
          console.log(error);
        })
        swal.fire(
          'Eliminado!',
          'El empleado ha sido eliminado con exito.',
          'success'
        )
      }
    })

  }

}
