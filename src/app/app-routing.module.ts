import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialCrudComponent } from './components/material-crud/material-crud.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  {path: '', component: MaterialCrudComponent},
  {path: 'todo', component: TodoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
