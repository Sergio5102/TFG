import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadosComponent } from './componentes/crear-empleados/crear-empleados.component';
import { ListEmpleadosComponent } from './componentes/list-empleados/list-empleados.component';

//Estas son todas las rutas para la nevegación de nuestra pagina.
//Tienen los siguientes atributos:
//path --> nombre que nos aparecera en la URL
//component --> al componente al que redirige
//También hay otras dos rutas que sirven para que en caso de que la...
//...ruta este mal puesta o no ponga nada redirija al path home.
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListEmpleadosComponent },
  { path: 'crear-empleado', component: CrearEmpleadosComponent },
  { path: 'editEmpleado/:id', component: CrearEmpleadosComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
