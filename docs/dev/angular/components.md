# Architecture of an Angular2 App

Eine Angular2-Anwendung erfordert eine stringente und gut geplante Architektur, andernfalls kommt es schnell zu einer verwirrenden Sammlung von Code-Schnippels, die kaum wartbar sind. Die Sprachmerkmal von TypeScript und die Modularisierung von Angular helfen dabei und unterstützen die Vorgehensweise explizit.

## Bestandteile der Anwendung

Technisch kann eine Anwendung in folgende Bausteine zerlegt werden:

* Komponenten
* Konfigurationen
* Dienste
* Modelle
* Hilfsdateien

Komponenten lassen sich weiter aufteilen. Zum einen sind dies universelle -- meist als Widget bezeichnete -- UI-Elemente, wie beispielsweise Tabellen (Grid), Baumansichten (Treeview) oder Tabulatoren (Tabs). Zum anderen sind dies die elementaren Bausteine der Applikation, die mit dem Benutzer interagieren. Das sind dann Formulare, Dashboards usw.

Bei den Konfigurationen werden alle globalen Dinge abgelegt. Dies betrifft vor allem das Routing und Mehrsprachigkeit. Dienste dienen der Kommunikation zwischen Komponenten und der Bereitstellung eienr Dienstschicht zum Server. Modelle fassen alle Klassen zusammen, die Daten behandeln. Im Wesentlichen sind dies View-Modelle und deren Hilfsbausteine wie Validatoren.

### Benennungsregeln

Legen Sie sich am Anfang klare Benennungsregeln auf. Die vielen Formen machen es sonst schwer, die richtigen Dateinamen zu finden. Generell sollte der Name der Datei dem Namen der Klasse entsprechen. 

Klassen können einen Suffix bekommen, wenn es sehr viele einer Sorte gibt. Das vermeidet Konflikte und damit unglücklich gewählte Namen:

* ListUserComponent (Suffix: Component)
* EventsViewModel (Suffix: ViewModel)

Auf Dateiebene bietet es sich eher an, Präfixe zu verwenden. Das hat praktische Gründe, auch wenn es auf den ersten Blick inkonsequent erscheint. Dateilisten sind oft alphabetisch sortiert, und dann haben Sie die Gruppen schnell im Blick, auch wenn sie im Client als lange Liste von JS-Dateien ankommen.

### Komponenten

Komponenten bilden am Ende eine Baumstruktur, viele universelle Komponenten sind aber mehrfach im Einsatz. Ein Baum eignet sich deshalb nicht zur Anordnung der Komponenten im Projekt. Eine fachliche Anordnung ist oft sinnvoller. Als Beispiel soll hier eine Applikation beschrieben werden, die Veranstaltungen verwaltet. Diese hätte dann folgende Komponenten-Struktur:

~~~
App -
    |- Compontents
        |- Widgets
            |- DataGrid 
              | - Models
              |  |- datagrid.helper.ts  
              |  |- datagrid.model.ts               
              |- pagination.component.ts               
            |- Treeview  
              | - Models
              |  |- index.ts  
              |  |- vm-treeview-baseinterface.ts               
              |  |- datagrid.helper.ts  
              |  |- datagrid.model.ts               
              |- treeview.ts  
              |- treeview-node.ts  
            |- infobox.ts  
            |- sidemenu.ts  
            |- tabs.ts  
            |- webpart.ts  
        |- events
            |- list.ts
            |- new.ts
            |- edit.ts
            |- delete.ts
        |- users 
            |- list.ts
            |- new.ts
            |- edit.ts
            |- delete.ts
    |- Configurations
        |- routes.ts
    |- Decorators
        |- diverse Dekoratoren 
    |- Services 
        |- diverse Dienste
    |- Utils
        |- diverse Hilfsklassen 
    |- ViewModels        
        |- EventViewModel.ts 
        |- UserViewModel.ts
~~~  

Oft sind viele Komponenten in einem Rutsch zu importieren. Wenn Sie zwei oder mehr in einem Ordner haben, fügen Sie immer eine Datei *index.ts* ein:

~~~
export * from './treeView/ac-treeview';
export * from './treeView/ac-treeview-node';
export * from './datagrid/ac-datagridpagination';
~~~

Beim Import einer oder mehrerer Komponenten sieht es dann folgendermaßen aus:

~~~
import * as cmp from './components/index';
import * as wd from './components/widgets/index';
~~~

Sie können dann mit `cmp.ComponentenName` oder `wd.WidgetName` auf die Komponenten zugreifen, ohne jede Datei einzeln importieren zu müssen. Die Dateierweiterung _*.ts_ wird automatisch benutzt, sodass es reicht *index* zu schreiben.

# Forms

https://toddmotto.com/angular-2-form-controls-patch-value-set-value
