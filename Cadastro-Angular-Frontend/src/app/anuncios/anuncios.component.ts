import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Anuncios } from '../anuncios';
import { AnunciosService } from '../anuncios.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent  {
  anuncios: Anuncios[] = [];
  formGroupAnuncios: FormGroup;

  constructor(private anunciosService: AnunciosService, private formBuilder:FormBuilder){
    this.formGroupAnuncios = this.formBuilder.group({
      id: '',
      titulo: '',
      descricao: '',
      marca: '',
      valor: '',
      url:''
    });
  }

  ngOnInit(): void {
    this.loadAnuncios();
  }
  loadAnuncios() {
    this.anunciosService.getAnuncios().subscribe( //
    {
      next: data => this.anuncios = data,
    error: () => console.log('error')
    }
   );
  }
  
  save(){
    this.anunciosService.save(this.formGroupAnuncios.value).subscribe(
      {
        //a resposta chega pelo next | client é data
        next : data => { //tratando o retorno do save |
          this.anuncios.push(data); //atualiza o array
          this.formGroupAnuncios.reset();
        }
      }
     );
  }
  
 
   
  
}

