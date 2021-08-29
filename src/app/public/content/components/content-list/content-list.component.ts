import { Component, OnInit } from '@angular/core';
import { CONTENT } from 'src/app/common/apiRoutes';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  content;
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getContent();
  }

  /**
   * @purpose Get Category List
   */
  async getContent() {
    this.apiService.startLoader();
    const result: any = await this.apiService.get(CONTENT.GET);
    this.content = result.data;
    console.log("res::", result);

  }
}
