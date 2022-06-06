import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  //Estos metodos los usaremos para comunicarnos con el backend
  constructor(private firestore: AngularFirestore) { }
  //Añadir empleado
  agregarEmpleado(empleado: any) {
    return this.firestore.collection('empleado').add(empleado);
  }
  //Obtener listado empleados
  getEmpleados(): Observable<any> {
    return this.firestore.collection('empleado', ref => ref.orderBy('nombre')).snapshotChanges();
  }
  //Elimina empleado
  eliminarEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleado').doc(id).delete();
  }
  //Obtiene los datos del empleado
  getEmpleado(id: string): Observable<any> {
    return this.firestore.collection('empleado').doc(id).snapshotChanges();
  }
  //Actualiza los datos del empleado
  actualizarEmpleado(id: string, data: any): Promise<any> {
    return this.firestore.collection('empleado').doc(id).update(data);
  }
}
