import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllFilesViewService } from '../all-files/all-files-view.service';
import { PhasesService } from '../header/phases.service';
import { Doc } from '../model/doc.model';
import { DocsService } from './docs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  docs: Doc[] = [];

  constructor(private docsService: DocsService, private router:Router,private phaseService: PhasesService, private allFilesViewService: AllFilesViewService) { }

  ngOnInit(): void {
    this.docs = this.docsService.getDocs();
  }

  getImageDocs(){
    return this.docsService.getDocs().filter(doc => doc.type == "image" || doc.type == "doc-image").map(doc => {
      if(doc.type == "image") return doc;
      return {id: doc.id, name: "Use Case", type: "image", phase: doc.phase, details: { path: doc.details.path } }
    });
  }

  isAllFilesRoute(){
    return this.router.url === '/all';
  }

  deleteDoc(id: number){
    this.docsService.deleteDoc(id);
  }

  editDoc(id: number, editedDoc:Doc){
    this.docsService.editDoc(id, editedDoc);
  }
  
  showDoc(id: number){
    let doc = this.docsService.getDoc(id);
    //Show doc on page
    console.log(`Here you go: ${doc.id} -> ${doc.name}`);
    if(this.isAllFilesRoute()){
      this.allFilesViewService.setImgPath(doc.details.path);
      return;
    }
    this.phaseService.selectPhase(doc.phase);
    setTimeout(() => this.docsService.fillForm(doc.phase,doc),100);
  }

  getNumberOfDocs(){
    return this.docsService.getNumberOfDocs();
  }

}
