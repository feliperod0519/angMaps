import { Component, OnInit } from '@angular/core';
import { Observable, timer, pipe, of, EMPTY} from 'rxjs';
import { endWith, flatMap, map, take,scan, switchMap, mergeMap, exhaustMap, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'maps';

  letters = ['a','b','c','d','e','f'];
  numbers$: Observable<number> = of(0);
  letters$: Observable<string> = of('');
  flatExample$: Observable<any> = EMPTY;
  switchExample$: Observable<any> = EMPTY;
  exhaustExample$: Observable<any> = EMPTY;
  concatExample$: Observable<any> = EMPTY;

  constructor(){
    this.numbers$ = timer(0,1000).pipe(take(6))
    this.letters$ = timer(0,300).pipe(
                                        take(6),
                                        map(v=>this.letters[v])
                                      )
    this.flatExample$ = this.numbers$.pipe(
                        flatMap((outerVal)=>this.letters$.pipe(
                          map(innerVal=>[outerVal,innerVal]),
                          endWith([outerVal,'Z']) //emit when completed
                        )),
                        scan((acc:string[], [ outerVal, innerVal ]) => acc.concat([outerVal + '-' + innerVal]), [])  //[outerVal + '-' + innerVal]
                        )
                      
    this.switchExample$ = this.numbers$.pipe(
                        switchMap((outerVal)=>this.letters$.pipe(
                          map(innerVal=>[outerVal,innerVal]),
                          endWith([outerVal,'Z'])
                        )),
                        scan((acc:string[], [ outerVal, innerVal ]) => acc.concat([outerVal + '-' + innerVal]), [])
                        )

    this.exhaustExample$ = this.numbers$.pipe(
                          exhaustMap((outerVal)=>this.letters$.pipe(
                            map(innerVal=>[outerVal,innerVal]),
                            endWith([outerVal,'Z'])
                          )),
                          scan((acc:string[], [ outerVal, innerVal ]) => acc.concat([outerVal + '-' + innerVal]), [])
                          )

    this.concatExample$ = this.numbers$.pipe(
                            concatMap((outerVal)=>this.letters$.pipe(
                              map(innerVal=>[outerVal,innerVal]),
                              endWith([outerVal,'Z'])
                            )),
                            scan((acc:string[], [ outerVal, innerVal ]) => acc.concat([outerVal + '-' + innerVal]), [])
                            )                      
  }

  ngOnInit():void{
    
  }

}
