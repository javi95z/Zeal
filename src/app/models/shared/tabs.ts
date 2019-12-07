export class Tabs {
  selectedTab: number | null;
  tabChanged($event: number) {
    this.selectedTab = $event;
  }
}
