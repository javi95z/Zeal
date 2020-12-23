import { Injector, Input, Output, EventEmitter } from "@angular/core";
import { ApiCollection } from "@models";
import { MasterClass } from "./master";

export class DataWidgetClass<T> extends MasterClass<T> {
  @Input() title?: string;
  @Output() countValues = new EventEmitter<number>();
  @Input() canCreate?: boolean;
  @Input() canCollapse?: boolean;
  @Input() canFilter?: boolean;
  @Input() canRefresh?: boolean;
  public refresh = false;
  protected masterData: T[];
  public data: T[];
  public params: object;

  constructor(injector: Injector) {
    super(injector);
  }

  protected async loadData(): Promise<T[]> {
    await this.api
      .getAll(this.resourceName, this.params)
      .then((o: ApiCollection<T>) => {
        this.masterData = o.data;
        this.countValues.emit(o.data.length)
      })
      .finally(() => (this.refresh = false));
    return this.masterData;
  }

  /**
   * Create new resource with the
   * params specified on the widget
   */
  protected createNew(data?: object) {
    this.createDialog(data || this.params).then((o) => {
      if (!o) return;
      this.addToList(o.data);
    });
  }

  /**
   * Add a new record to the whole list
   * @param record Record to be added
   */
  private addToList(record: T) {
    this.masterData.push(record);
  }
}
