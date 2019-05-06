import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpfxConvertTilesWebPart.module.scss';
import * as strings from 'SpfxConvertTilesWebPartStrings';

import 'jquery';  
import 'flip';

require('./PAITGroup.PromotedLinks.js');
require('./PAITGroup.PromotedLinks.css');
require('./masonry.pkgd.min.js');

declare var $;

export interface ISpfxConvertTilesWebPartProps {
  description: string;
  listName: string;
  tileWidth:    number;
  tileHeight:    number;
  showTitle:    boolean;  
}

export default class SpfxConvertTilesWebPart extends BaseClientSideWebPart<ISpfxConvertTilesWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `<div id="PAITLinks"></div>`;

    
    $().PAITGroupPromotedLinks({
      listName: this.properties.listName,
      tileWidth:    this.properties.tileWidth,
      tileHeight:    this.properties.tileHeight,
      showTitle:    this.properties.showTitle,
      url: this.context.pageContext.site.absoluteUrl
    });

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  
  protected get disableReactivePropertyChanges(): boolean {	
    return true;
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameDescription
                }),
                PropertyPaneTextField('tileHeight', {
                  label: strings.TileHeightDescription
                }),
                PropertyPaneTextField('tileWidth', {
                  label: strings.TileWidthDescription
                }),
                PropertyPaneCheckbox('showTitle', {
                  text: strings.ShowTitleDescription,
                  checked: true
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
