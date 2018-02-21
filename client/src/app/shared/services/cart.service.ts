import {Injectable} from '@angular/core'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {Producto} from '../models'

@Injectable()
export class CartService {

    constructor(){}

    items: Producto[] = []

    addItem(item:Producto){
        this.items.push(item)
        localStorage.setItem("cart",JSON.stringify(this.items))
    }

    removeItem(Product){
        this.items.splice(this.items.indexOf(Product), 1)
        //salva na sessão
        localStorage.setItem("cart",JSON.stringify(this.items))   
    }
    
    total() :number{
        let total = 0; 
        
        this.items.forEach(item => {
            total += (item.price);
        })
        return total
    }

    removeAll(){
        this.items = []
    }
}