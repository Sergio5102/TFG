import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-crear-empleados',
  templateUrl: './crear-empleados.component.html',
  styleUrls: ['./crear-empleados.component.css']
})
export class CrearEmpleadosComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  texto = 'Añadir Empleado';

  //Inyeccion de clase FormBuilder para la validación del formulario para que todos los campos sean requeridos
  constructor(private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar();
  }
  //Metodo que comprueba que sea valido el formulario en caso afirmativo comprueba si no tiene id
  //En este caso iremos al metodo agregarEmpleado() en caso contrario a editarEmpleado()
  agregarEditarEmpleado() {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return;
    }
    if (this.id == null) {
      this.agregarEmpleado();
    } else (
      this.editarEmpleado(this.id)
    )

  }
  //Metodo para añadir un nuevo empleado
  agregarEmpleado() {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualización: new Date(),
    }
    this.loading = true;
    this.empleadoService.agregarEmpleado(empleado).then(() => {
      this.toastr.success('El empleado fue registrado con exito', 'Empleado Registrado');
      this.loading = false;
      this.router.navigate(["/home"]);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }
  //Metodo para modificar un empleado
  editarEmpleado(id: string) {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualización: new Date(),
    }
    this.loading = true;
    this.empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info("El empleado fue modificado con exito", "Empleado modificado")
    })
    this.router.navigate(["/home"]);
  }
  //Metodo para que al editar un empleado nos salgan los campos con sus datos en el formulario
  esEditar() {
    this.texto = 'Editar Empleado'
    if (this.id !== null) {
      this.loading = true;
      this.empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        })
      })
    }
  }

}
