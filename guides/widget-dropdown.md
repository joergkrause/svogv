## Usage of DropDown

This is a typical markup: 

~~~
&lt;ac-dropmenu [menu]="formWidgets" [hasSplitBtn]="false" text="Some text" id="formWidgets"&gt;&lt;/ac-dropmenu&gt;
~~~

You have these options:

* menu: The menu's data
* text: The button text
* hasSplitButton: A divider for the drop function, a caret appears
* btnType: The type of button according to Bootstrap, such as <code>Actions.Info</code> (it's an enum)
* btnSize: The size, again an enum of type Sizes. <code>Use Sizes.XSmall</code> for instance.

This is the code in the component:

~~~
import { AcMenu, AcMenuLinkItem, AcMenuTextItem } from 'svogv';

export class ListWidgetsComponent implements OnInit {

  public formWidgets : AcMenu

  constructor() {
  }

  ngOnInit(){
    this.formWidgets = new AcMenu(
        new AcMenuLinkItem('TreeView', ['/widgets/tree'])
      , new AcMenuLinkItem('DropDown', ['/widgets/drop'])
      , new AcMenuLinkItem('InfoBox', ['/widgets/info'])
      , new AcMenuLinkItem('BreadCrumb', ['/widgets/bread']));
  }


}
~~~

So you need two things here: the markup and the classes `AcMenu` along with the item classes `AcMenuLinkItem` or `AcMenuTextItem`. 