import { Component } from '@angular/core';
export class TWADialogsComponent {
    constructor() {
        this.message = 'Hello';
    }
    ngOnInit() {
        setTimeout(() => {
            this.message += ' World';
        }, 1000);
    }
}
TWADialogsComponent.decorators = [
    { type: Component, args: [{
                selector: 'example-component',
                template: '{{message}}'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWRpYWxvZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lLm9sZC9qb3NlL3dvcmsvc2lyYS5lcy9zaXJhLW5nMi1jb21wb25lbnRzL2xpYi10d2EtbWQvcHJvamVjdHMvdHdhLW1kMi1kaWFsb2dzL3NyYy8iLCJzb3VyY2VzIjpbImxpYi90d2EtZGlhbG9ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQU1sRCxNQUFNLE9BQU8sbUJBQW1CO0lBSmhDO1FBS0MsWUFBTyxHQUFHLE9BQU8sQ0FBQztJQVFuQixDQUFDO0lBTkEsUUFBUTtRQUNQLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQztRQUMxQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDVixDQUFDOzs7WUFYRCxTQUFTLFNBQUM7Z0JBQ1YsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFLGFBQWE7YUFDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdleGFtcGxlLWNvbXBvbmVudCcsXG5cdHRlbXBsYXRlOiAne3ttZXNzYWdlfX0nXG59KVxuZXhwb3J0IGNsYXNzIFRXQURpYWxvZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRtZXNzYWdlID0gJ0hlbGxvJztcblxuXHRuZ09uSW5pdCgpIHtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMubWVzc2FnZSArPSAnIFdvcmxkJztcblx0XHR9LCAxMDAwKTtcblx0fVxuXG59XG4iXX0=