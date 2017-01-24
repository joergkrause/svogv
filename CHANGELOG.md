<a name="0.0.8"></a>
# [0.0.8](https://github.com/joergkrause/svogv/releases/tag/0.0.8) (2017-01-01)

### First release of SVOGV!

This inaugural release includes these components:

* Hidden: Element will not be rendered as column in ac-datagrid
* Display: Change columns header or label name and add a tooltip optionally

Also several validation decorators are supported:

* Required: Property must have a value
* MaxLength: Max number of chars (string only)
* MinLength: Min number of chars (string only)
* Pattern: A regular expression
* Range: A range of type `number` or of type `Date` for the property's value
* Email: Check whether the property contains a valid email

As the alpha process continues, these components will continue to evolve. There *will* be
breaking changes between alpha releases; the alpha releases are here for people that want an
early look or who like to live on the edge and are very tolerant of breaking API and behavior 
changes.

<a name="0.0.23"></a>
# [0.0.23](https://github.com/joergkrause/svogv/releases/tag/0.0.23) (2017-01-20)

### A pre-production release of SVOGV!

This is the first we use in production to see how to use basic functions in real world environment.

* Placeholder: A new decorator to put watermarks into editor elements

New validation decorators:

* Compare: Compare two fields, such as in password field combinations

Several widgets are now usable:

* DataGrid
* Editors
* InfoBox
* Menu, which comes in two flavors:
    * DropMenu -- a complex multi level menu
    * SideMenu -- a simple one level menu
* TreeView
* BreadCrumb
* Tabs

Still under construction, because of SMIL we use for SVG and that we still need to get rid of:

* AnalogClock
* LoaderIcon

The demo does now use WebPack 2 to create the bundles. SystemJS loader is still working for debugging. 