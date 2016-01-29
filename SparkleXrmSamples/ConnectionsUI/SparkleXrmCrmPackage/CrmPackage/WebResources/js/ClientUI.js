// ClientUI.js
(function($){
Type.registerNamespace('ClientUI');ResourceStrings=function(){}
Type.registerNamespace('ClientUI.ViewModels');ClientUI.ViewModels.QueryParser=function(entities){this.entityLookup={};this.$0={};this.$1={};this.entities=entities;}
ClientUI.ViewModels.QueryParser.getFetchXmlParentFilter=function(query,parentAttribute){var $0=query.fetchXml.find('fetch');$0.attr('count','{0}');$0.attr('paging-cookie','{1}');$0.attr('page','{2}');$0.attr('returntotalrecordcount','true');$0.attr('distinct','true');$0.attr('no-lock','true');var $1=$0.find('order');query.orderByAttribute=$1.attr('attribute');query.orderByDesending=$1.attr('descending')==='true';$1.remove();var $2=$0.find('entity>filter');if($2!=null){var $4=$2.attr('type');if($4==='or'){var $5=$("<filter type='and'>"+$2.html()+'</filter>');$2.remove();$2=$5;$0.find('entity').append($5);}}var $3=$("<condition attribute='"+parentAttribute+"' operator='eq' value='"+'#ParentRecordPlaceholder#'+"'/>");$2.append($3);return query.fetchXml.html().replaceAll('</entity>','{3}</entity>');}
ClientUI.ViewModels.QueryParser.prototype={entities:null,getQuickFinds:function(){this.$2(true,null);},getView:function(entityLogicalName,viewName){this.$2(false,viewName);},$2:function($p0,$p1){var $0="<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>\r\n                              <entity name='savedquery'>\r\n                                <attribute name='name' />\r\n                                <attribute name='fetchxml' />\r\n                                <attribute name='layoutxml' />\r\n                                <attribute name='returnedtypecode' />\r\n                                <filter type='and'>\r\n                                <filter type='or'>";var $enum1=ss.IEnumerator.getEnumerator(this.entities);while($enum1.moveNext()){var $3=$enum1.current;var $4=Mscrm.EntityPropUtil.EntityTypeName2CodeMap[$3];$0+="<condition attribute='returnedtypecode' operator='eq' value='"+$4.toString()+"'/>";}$0+='</filter>';if($p0){$0+="<condition attribute='isquickfindquery' operator='eq' value='1'/>\r\n                                    <condition attribute='isdefault' operator='eq' value='1'/>";}else if($p1!=null&&$p1.length>0){$0+="<condition attribute='name' operator='eq' value='"+Xrm.Sdk.XmlHelper.encode($p1)+"'/>";}else{$0+="<condition attribute='querytype' operator='eq' value='2'/>\r\n                                    <condition attribute='isdefault' operator='eq' value='1'/>";}$0+='</filter>\r\n                              </entity>\r\n                            </fetch>';var $1=Xrm.Sdk.OrganizationServiceProxy.retrieveMultiple($0);var $2={};var $enum2=ss.IEnumerator.getEnumerator($1.get_entities());while($enum2.moveNext()){var $5=$enum2.current;$2[$5.getAttributeValueString('returnedtypecode')]=$5;}var $enum3=ss.IEnumerator.getEnumerator(this.entities);while($enum3.moveNext()){var $6=$enum3.current;var $7=$2[$6];var $8=$7.getAttributeValueString('fetchxml');var $9=$7.getAttributeValueString('layoutxml');var $A;if(Object.keyExists(this.entityLookup,$6)){$A=this.entityLookup[$6];}else{$A={};$A.logicalName=$6;$A.views={};$A.attributes={};this.entityLookup[$6]=$A;}var $B=this.$3($8,$9);$A.views[$7.getAttributeValueString('name')]=$B;if($p0){$A.quickFindQuery=$B;}}},$3:function($p0,$p1){var $0={};var $1=$('<query>'+$p0.replaceAll('{0}','#Query#')+'</query>');var $2=$1.find('fetch');$0.fetchXml=$1;this.$5($0);$0.columns=this.$4($0.rootEntity,$p1);return $0;},$4:function($p0,$p1){var $0=$($p1);var $1=$0.find('cell');var $2=[];$1.each(ss.Delegate.create(this,function($p1_0,$p1_1){
var $1_0=$p1_1.getAttribute('name').toString();var $1_1=$1_0;var $1_2;var $1_3;var $1_4=$1_0.indexOf('.');if($1_4>-1){var $1_8=$1_0.substr(0,$1_4);$1_1=$1_0.substr($1_4+1);$1_2=this.$0[$1_8];}else{$1_2=$p0;}if(Object.keyExists($1_2.attributes,$1_1)){$1_3=$1_2.attributes[$1_1];}else{$1_3={};$1_3.columns=[];$1_3.logicalName=$1_1;$1_2.attributes[$1_3.logicalName]=$1_3;}var $1_5=parseInt($p1_1.getAttribute('width').toString());var $1_6=$p1_1.getAttribute('disableSorting');var $1_7=SparkleXrm.GridEditor.GridDataViewBinder.newColumn($1_3.logicalName,$1_3.logicalName,$1_5);$1_7.sortable=!($1_6!=null&&$1_6.toString()==='1');$1_3.columns.add($1_7);$2.add($1_7);}));return $2;},queryMetadata:function(){var $0=new Xrm.Sdk.Metadata.Query.MetadataQueryBuilder();var $1=[];var $2=[];var $enum1=ss.IEnumerator.getEnumerator(Object.keys(this.entityLookup));while($enum1.moveNext()){var $4=$enum1.current;$1.add($4);var $5=this.entityLookup[$4];var $enum2=ss.IEnumerator.getEnumerator(Object.keys($5.attributes));while($enum2.moveNext()){var $6=$enum2.current;var $7=$5.attributes[$6];var $8=$7.logicalName;var $9=$8.indexOf('.');if($5.aliasName!=null&&$9>-1){$8=$8.substr($9);}$2.add($8);}}$0.addEntities($1,['Attributes','DisplayName','DisplayCollectionName','PrimaryImageAttribute']);$0.addAttributes($2,['DisplayName','AttributeType','IsPrimaryName']);$0.setLanguage(USER_LANGUAGE_CODE);var $3=Xrm.Sdk.OrganizationServiceProxy.execute($0.request);var $enum3=ss.IEnumerator.getEnumerator($3.entityMetadata);while($enum3.moveNext()){var $A=$enum3.current;var $B=this.entityLookup[$A.logicalName];$B.displayName=$A.displayName.userLocalizedLabel.label;$B.displayCollectionName=$A.displayCollectionName.userLocalizedLabel.label;$B.primaryImageAttribute=$A.primaryImageAttribute;$B.entityTypeCode=$A.objectTypeCode;var $enum4=ss.IEnumerator.getEnumerator($A.attributes);while($enum4.moveNext()){var $C=$enum4.current;if(Object.keyExists($B.attributes,$C.logicalName)){var $D=$B.attributes[$C.logicalName];$D.attributeType=$C.attributeType;switch($C.attributeType){case 'Lookup':case 'Picklist':case 'Customer':case 'Owner':case 'Status':case 'State':case 'Boolean':this.$1[$C.logicalName]=$D;break;}$D.isPrimaryName=$C.isPrimaryName;var $enum5=ss.IEnumerator.getEnumerator($D.columns);while($enum5.moveNext()){var $E=$enum5.current;$E.name=$C.displayName.userLocalizedLabel.label;$E.dataType=($C.isPrimaryName)?'PrimaryNameLookup':$C.attributeType;}}}}},$5:function($p0){var $0=$p0.fetchXml;var $1=$0.find('entity');var $2=$1.attr('name');var $3;if(!Object.keyExists(this.entityLookup,$2)){$3={};$3.logicalName=$2;$3.attributes={};this.entityLookup[$3.logicalName]=$3;}else{$3=this.entityLookup[$2];}var $4=$1.find('link-entity');$4.each(ss.Delegate.create(this,function($p1_0,$p1_1){
var $1_0={};$1_0.attributes={};$1_0.aliasName=$p1_1.getAttribute('alias').toString();$1_0.logicalName=$p1_1.getAttribute('name').toString();if(!Object.keyExists(this.entityLookup,$1_0.logicalName)){this.entityLookup[$1_0.logicalName]=$1_0;}else{var $1_1=$1_0.aliasName;$1_0=this.entityLookup[$1_0.logicalName];$1_0.aliasName=$1_1;}if(!Object.keyExists(this.$0,$1_0.aliasName)){this.$0[$1_0.aliasName]=$1_0;}}));$p0.rootEntity=$3;var $5=$0.find("filter[isquickfindfields='1']");$5.first().children().each(function($p1_0,$p1_1){
$2=$p1_1.getAttribute('attribute').toString();var $1_0=$($p1_1);var $1_1=$1_0.parents('link-entity');if(!Object.keyExists($p0.rootEntity.attributes,$2)){var $1_2={};$1_2.logicalName=$2;$1_2.columns=[];$p0.rootEntity.attributes[$2]=$1_2;}});},getFetchXmlForQuery:function(entityLogicalName,queryName,searchTerm){var $0;if(queryName==='QuickFind'){$0=this.entityLookup[entityLogicalName].quickFindQuery;}else{$0=this.entityLookup[entityLogicalName].views[queryName];}var $1=$0.fetchXml.find('fetch');$1.attr('distinct','true');$1.attr('no-lock','true');var $2=$1.find('order');$2.remove();var $3=$1.find("filter[isquickfindfields='1']");$3.first().children().each(ss.Delegate.create(this,function($p1_0,$p1_1){
var $1_0=$p1_1.getAttribute('attribute').toString();if(Object.keyExists(this.$1,$1_0)){$p1_1.setAttribute('attribute',$1_0+'name');}}));var $4=$0.fetchXml.html();$4=$4.replaceAll('#Query#',Xrm.Sdk.XmlHelper.encode(searchTerm));return $4;}}
Type.registerNamespace('ClientUI.View.GridPlugins');ClientUI.View.GridPlugins.RowHoverPlugin=function(containerDivId){this.$2=containerDivId;}
ClientUI.View.GridPlugins.RowHoverPlugin.prototype={$0:null,$1:null,$2:null,$3:false,destroy:function(){this.$1.remove();},init:function(grid){this.$0=grid;this.$1=$('#'+this.$2);this.$1.mouseenter(ss.Delegate.create(this,function($p1_0){
this.$3=false;}));$('#grid').find('.slick-viewport').append(this.$1);(this.$0.onMouseEnter).subscribe(ss.Delegate.create(this,this.handleMouseEnter));(this.$0.onMouseLeave).subscribe(ss.Delegate.create(this,this.handleMouseLeave));},handleMouseLeave:function(e,item){this.$3=true;window.setTimeout(ss.Delegate.create(this,function(){
if(this.$3){this.$1.fadeOut();}}),500);},handleMouseEnter:function(e,item){var $0=this.$0.getCellFromEvent(e);if($0!=null){this.$3=false;var $1=this.$0.getDataItem($0.row);if($1!=null){this.$0.getGridPosition();var $2=this.$0.getViewport().rightPx;var $3=this.$0.getViewport().leftPx;var $4=$(this.$0.getCellNode($0.row,$0.cell));var $5=this.$1.width();var $6=$4.parent().width();if($2<$6+$5){$6=$2-$5;}var $7=0;$4.parent().append(this.$1);this.$1.css('left',$6.toString()+'px');this.$1.css('top',$7.toString()+'px');this.$1.css('display','block');this.$1.attr('rowId',$1.id);}}}}
Type.registerNamespace('ClientUI.Model');ClientUI.Model.Connection=function(){ClientUI.Model.Connection.initializeBase(this,['connection']);}
ClientUI.Model.Connection.prototype={connectionid:null,record1id:null,record2id:null,record1roleid:null,record2roleid:null,description:null,effectivestart:null,effectiveend:null}
Type.registerNamespace('ClientUI.ViewModel');ClientUI.ViewModel.ConnectionsViewModel=function(parentRecordId,connectToTypes,pageSize,view){this.SelectedConnection=ko.observable();this.ErrorMessage=ko.observable();this.parentRecordId=ko.observable();ClientUI.ViewModel.ConnectionsViewModel.initializeBase(this);this.Connections=new SparkleXrm.GridEditor.EntityDataViewModel(pageSize,ClientUI.Model.Connection,true);if(view!=null){this.$1_0=ClientUI.ViewModels.QueryParser.getFetchXmlParentFilter(view,'record1id');this.$1_1=new SparkleXrm.GridEditor.SortCol(view.orderByAttribute,!view.orderByDesending);}this.parentRecordId(parentRecordId);var $0=new ClientUI.ViewModel.ObservableConnection(connectToTypes);$0.record2id(parentRecordId);this.ConnectionEdit=ko.validatedObservable($0);this.Connections.onDataLoaded.subscribe(ss.Delegate.create(this,this.$1_2));this.ConnectionEdit().add_onSaveComplete(ss.Delegate.create(this,this.$1_4));ClientUI.ViewModel.ObservableConnection.registerValidation(this.Connections.validationBinder);this.AllowAddNew=ko.dependentObservable(ss.Delegate.create(this,this.allowAddNewComputed));}
ClientUI.ViewModel.ConnectionsViewModel.prototype={Connections:null,ConnectionEdit:null,AllowAddNew:null,$1_0:null,$1_1:null,$1_2:function($p0,$p1){var $0=$p1;for(var $1=0;$1<$0.to;$1++){var $2=this.Connections.getItem($1);if($2==null){return;}$2.add_propertyChanged(ss.Delegate.create(this,this.$1_3));}},$1_3:function($p0,$p1){var $0=new ClientUI.Model.Connection();var $1=$p0;$0.connectionid=new Xrm.Sdk.Guid($1.id);var $2=false;switch($p1.propertyName){case 'record2roleid':if($1.record1id==null){var $3=Xrm.Sdk.OrganizationServiceProxy.retrieve(ClientUI.Model.Connection.logicalName,$1.connectionid.value,['record1id']);$1.record1id=$3.record1id;}$0.record2roleid=$1.record2roleid;$0.record1roleid=ClientUI.ViewModel.ObservableConnection.getOppositeRole($1.record2roleid,$1.record1id);$2=true;break;case 'description':$0.description=$1.description;$2=true;break;case 'effectivestart':$0.effectivestart=$1.effectivestart;$2=true;break;case 'effectiveend':$0.effectiveend=$1.effectiveend;$2=true;break;}if($2){Xrm.Sdk.OrganizationServiceProxy.beginUpdate($0,ss.Delegate.create(this,function($p1_0){
try{Xrm.Sdk.OrganizationServiceProxy.endUpdate($p1_0);this.ErrorMessage(null);}catch($1_0){this.ErrorMessage($1_0.message);}}));}},$1_4:function($p0){if($p0==null){this.Connections.reset();this.Connections.refresh();}this.ErrorMessage($p0);},search:function(){var $0=this.parentRecordId().id.toString().replaceAll('{','').replaceAll('}','');if(this.$1_0==null){this.Connections.set_fetchXml("<fetch version='1.0' output-format='xml-platform' mapping='logical' returntotalrecordcount='true' no-lock='true' distinct='false' count='{0}' paging-cookie='{1}' page='{2}'>\r\n                                  <entity name='connection'>\r\n                                    <attribute name='record2id' />\r\n                                    <attribute name='record2roleid' />\r\n                                    <attribute name='record1id' />\r\n                                    <attribute name='record1roleid' />\r\n                                    <attribute name='connectionid' />\r\n                                    <filter type='and'>\r\n                                      \r\n                                      <condition attribute='record2id' operator='eq' value='"+$0+"' />\r\n                                    </filter>\r\n                                  {3}\r\n                                  </entity>\r\n                                </fetch>");this.Connections.refresh();}else{this.Connections.set_fetchXml(this.$1_0.replaceAll('#ParentRecordPlaceholder#',$0));this.Connections.sortBy(this.$1_1);}},RoleSearchCommand:function(term,callback){ClientUI.ViewModel.ObservableConnection.RoleSearch(term,callback,this.SelectedConnection().record2id.logicalName);},AddNewCommand:function(){this.ConnectionEdit().record2id(this.parentRecordId());this.ErrorMessage(null);this.ConnectionEdit().AddNewVisible(true);},OpenAssociatedSubGridCommand:function(){var $0=window.parent.Xrm.Page.ui.navigation.items.get('navConnections');$0.setFocus();},DeleteSelectedCommand:function(){var $0=SparkleXrm.GridEditor.DataViewBase.rangesToRows(this.Connections.getSelectedRows());if(!$0.length){return;}Xrm.Utility.confirmDialog(String.format(ResourceStrings.ConfirmDeleteSelectedConnection,$0.length),ss.Delegate.create(this,function(){
var $1_0=[];var $enum1=ss.IEnumerator.getEnumerator($0);while($enum1.moveNext()){var $1_1=$enum1.current;$1_0.add(this.Connections.getItem($1_1));}try{var $enum2=ss.IEnumerator.getEnumerator($1_0);while($enum2.moveNext()){var $1_2=$enum2.current;Xrm.Sdk.OrganizationServiceProxy.delete_($1_2.logicalName,new Xrm.Sdk.Guid($1_2.id));}}catch($1_3){this.ErrorMessage($1_3.toString());}this.Connections.raiseOnSelectedRowsChanged(null);this.Connections.reset();this.Connections.refresh();}),null);},DeleteCommand:function(data,e){Xrm.Utility.confirmDialog(ResourceStrings.ConfirmDeleteConnection,ss.Delegate.create(this,function(){
var $1_0=e.target.parentNode.getAttribute('rowId').toString();Xrm.Sdk.OrganizationServiceProxy.beginDelete(ClientUI.Model.Connection.logicalName,new Xrm.Sdk.Guid($1_0),ss.Delegate.create(this,function($p2_0){
try{Xrm.Sdk.OrganizationServiceProxy.endDelete($p2_0);var $enum1=ss.IEnumerator.getEnumerator(this.Connections.get_data());while($enum1.moveNext()){var $2_0=$enum1.current;if($2_0.id===$1_0){this.Connections.removeItem($2_0);break;}}this.Connections.refresh();}catch($2_1){this.ErrorMessage($2_1.message);}}));}),null);},allowAddNewComputed:function(){var $0=this.parentRecordId();return $0!=null&&$0.id!=null&&$0.id.value!=null&&$0.id.value.length>0;}}
ClientUI.ViewModel.ObservableConnection=function(types){this.AddNewVisible=ko.observable(false);this.connectiondid=ko.observable();this.record1id=ko.observable();this.record2id=ko.observable();this.record1roleid=ko.observable();this.record2roleid=ko.observable();this.description=ko.observable();ClientUI.ViewModel.ObservableConnection.initializeBase(this);this.$1_2=types;ClientUI.ViewModel.ObservableConnection.registerValidation(new SparkleXrm.ObservableValidationBinder(this));}
ClientUI.ViewModel.ObservableConnection.RoleSearch=function(term,callback,typeName){var $0='';var $1='';if(typeName!=null){var $3=ClientUI.ViewModel.ObservableConnection.$1_4(typeName);$0=String.format("\r\n                                        <filter type='or'>\r\n                                            <condition attribute='associatedobjecttypecode' operator='eq' value='{0}' />\r\n                                            <condition attribute='associatedobjecttypecode' operator='eq' value='0' />\r\n                                        </filter>",$3);}if(ClientUI.View.ConnectionsView.category>0){$1=String.format("<condition attribute='category' operator='eq' value='{0}' />",ClientUI.View.ConnectionsView.category);}var $2="\r\n                            <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' no-lock='true' >\r\n                                <entity name='connectionrole' >\r\n                                    <attribute name='category' />\r\n                                    <attribute name='name' />\r\n                                    <attribute name='connectionroleid' />\r\n                                    <attribute name='statecode' />\r\n                                    <order attribute='name' descending='false' />\r\n                                    <link-entity name='connectionroleobjecttypecode' from='connectionroleid' to='connectionroleid' >\r\n                                    {1}\r\n                                    </link-entity>\r\n                                    <filter type='and'>                                     \r\n                                        <condition attribute='name' operator='like' value='%{0}%' />\r\n                                    </filter>\r\n                                </entity>\r\n                            </fetch>";$2=String.format($2,Xrm.Sdk.XmlHelper.encode(term),$0);Xrm.Sdk.OrganizationServiceProxy.beginRetrieveMultiple($2,function($p1_0){
var $1_0=Xrm.Sdk.OrganizationServiceProxy.endRetrieveMultiple($p1_0,Xrm.Sdk.Entity);callback($1_0);});}
ClientUI.ViewModel.ObservableConnection.$1_4=function($p0){var $0=Mscrm.EntityPropUtil.EntityTypeName2CodeMap[$p0];return $0;}
ClientUI.ViewModel.ObservableConnection.getOppositeRole=function(role,record){var $0=null;var $1=ClientUI.ViewModel.ObservableConnection.$1_4(record.logicalName);var $2=String.format("<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' count='1'>\r\n                          <entity name='connectionrole'>\r\n                            <attribute name='category' />\r\n                            <attribute name='name' />\r\n                            <attribute name='connectionroleid' />\r\n                            <attribute name='statecode' />\r\n                            <filter type='and'>\r\n                              <condition attribute='statecode' operator='eq' value='0' />\r\n                            </filter>\r\n                            <link-entity name='connectionroleassociation' from='connectionroleid' to='connectionroleid' intersect='true'>\r\n                                  <link-entity name='connectionrole' from='connectionroleid' to='associatedconnectionroleid' alias='ad'>\r\n                                    <filter type='and'>\r\n                                      <condition attribute='connectionroleid' operator='eq' value='{0}' />\r\n                                    </filter>\r\n                                  </link-entity>\r\n                                 <link-entity name='connectionroleobjecttypecode' from='connectionroleid' to='connectionroleid' intersect='true' >\r\n                                    <filter type='or' >\r\n                                        <condition attribute='associatedobjecttypecode' operator='eq' value='{1}' />\r\n                                        <condition attribute='associatedobjecttypecode' operator='eq' value='0' /> <!-- All types-->\r\n                                    </filter>\r\n                                </link-entity>\r\n                            </link-entity>\r\n                          </entity>\r\n                        </fetch>",role.id.toString(),$1);var $3=Xrm.Sdk.OrganizationServiceProxy.retrieveMultiple($2);if($3.get_entities().get_count()>0){$0=$3.get_entities().get_item(0).toEntityReference();}return $0;}
ClientUI.ViewModel.ObservableConnection.validateRecord1Id=function(rules,viewModel,dataContext){return rules.addRule(ResourceStrings.RequiredMessage,function($p1_0){
return ($p1_0!=null)&&($p1_0).id!=null;});}
ClientUI.ViewModel.ObservableConnection.validateRecord1RoleId=function(rules,viewModel,dataContext){return rules.addRule(ResourceStrings.RequiredMessage,function($p1_0){
return ($p1_0!=null)&&($p1_0).id!=null;});}
ClientUI.ViewModel.ObservableConnection.registerValidation=function(binder){binder.register('record1id',ClientUI.ViewModel.ObservableConnection.validateRecord1Id);binder.register('record1roleid',ClientUI.ViewModel.ObservableConnection.validateRecord1RoleId);}
ClientUI.ViewModel.ObservableConnection.prototype={add_onSaveComplete:function(value){this.$1_0=ss.Delegate.combine(this.$1_0,value);},remove_onSaveComplete:function(value){this.$1_0=ss.Delegate.remove(this.$1_0,value);},$1_0:null,$1_1:null,$1_2:null,RecordSearchCommand:function(term,callback){if(this.$1_1==null){this.$1_1=new ClientUI.ViewModels.QueryParser(this.$1_2);this.$1_1.getQuickFinds();this.$1_1.queryMetadata();}var $0=0;var $1=[];var $2=ss.Delegate.create(this,function($p1_0){
$0++;var $1_0=this.$1_1.entityLookup[$p1_0.get_entityName()].quickFindQuery;var $enum1=ss.IEnumerator.getEnumerator($p1_0.get_entities());while($enum1.moveNext()){var $1_1=$enum1.current;var $1_2=$1_1;var $1_3=($1_0.columns.length<3)?$1_0.columns.length:3;for(var $1_4=0;$1_4<$1_3;$1_4++){var $1_5='col'+$1_4.toString();$1_1[$1_5]=$1_1[$1_0.columns[$1_4].field];$1_2.formattedValues[$1_5+'name']=$1_2.formattedValues[$1_0.columns[$1_4].field+'name'];}}$1.addRange($p1_0.get_entities().items());$1.sort(function($p2_0,$p2_1){
return String.compare($p2_0.getAttributeValueString('name'),$p2_1.getAttributeValueString('name'));});if($0===this.$1_2.length){var $1_6=new Xrm.Sdk.EntityCollection($1);callback($1_6);}});var $enum1=ss.IEnumerator.getEnumerator(this.$1_2);while($enum1.moveNext()){var $3=$enum1.current;this.$1_3(term,$2,$3);}},$1_3:function($p0,$p1,$p2){var $0=this.$1_1.getFetchXmlForQuery($p2,'QuickFind','%'+$p0+'%');Xrm.Sdk.OrganizationServiceProxy.beginRetrieveMultiple($0,function($p1_0){
var $1_0=Xrm.Sdk.OrganizationServiceProxy.endRetrieveMultiple($p1_0,Xrm.Sdk.Entity);$1_0.set_entityName($p2);$p1($1_0);});},RoleSearchCommand:function(term,callback){var $0=this.record1id();ClientUI.ViewModel.ObservableConnection.RoleSearch(term,callback,($0!=null)?$0.logicalName:null);},SaveCommand:function(){if(!(this).isValid()){(this).errors.showAllMessages(true);return;}this.isBusy(true);this.AddNewVisible(false);var $0=new ClientUI.Model.Connection();$0.record1id=this.record1id();$0.record2id=this.record2id();$0.record1roleid=this.record1roleid();$0.record2roleid=this.record2roleid();var $1=ClientUI.ViewModel.ObservableConnection.getOppositeRole($0.record1roleid,$0.record2id);$0.record2roleid=$1;Xrm.Sdk.OrganizationServiceProxy.beginCreate($0,ss.Delegate.create(this,function($p1_0){
try{this.connectiondid(Xrm.Sdk.OrganizationServiceProxy.endCreate($p1_0));this.$1_0(null);this.record1id(null);this.record1roleid(null);(this).errors.showAllMessages(false);}catch($1_0){this.$1_0($1_0.message);}finally{this.isBusy(false);}}));},CancelCommand:function(){this.AddNewVisible(false);}}
Type.registerNamespace('ClientUI.View');ClientUI.View.ConnectionsView=function(){}
ClientUI.View.ConnectionsView.Init=function(){Xrm.PageEx.majorVersion=2013;ClientUI.View.ConnectionsView.category=0;var $0=Xrm.Sdk.OrganizationServiceProxy.getUserSettings().uilanguageid;SparkleXrm.LocalisedContentLoader.fallBackLCID=0;SparkleXrm.LocalisedContentLoader.supportedLCIDs.add(0);SparkleXrm.LocalisedContentLoader.loadContent('con_/js/Res.metadata.js',$0,function(){
ClientUI.View.ConnectionsView.$1();});}
ClientUI.View.ConnectionsView.$1=function(){var $0;var $1;var $2;var $3=10;var $4=null;$0=Xrm.PageEx.getWebResourceData();$1=window.parent.Xrm.Page.data.entity.getId();$2=window.parent.Xrm.Page.data.entity.getEntityName();window.parent.Xrm.Page.data.entity.addOnSave(ClientUI.View.ConnectionsView.$2);var $5=new Xrm.Sdk.EntityReference(new Xrm.Sdk.Guid($1),$2,null);var $6='account,contact,opportunity,systemuser';var $enum1=ss.IEnumerator.getEnumerator(Object.keys($0));while($enum1.moveNext()){var $D=$enum1.current;switch($D.toLowerCase()){case 'entities':$6=$0[$D];break;case 'pageSize':$3=parseInt($0[$D]);break;case 'view':$4=$0[$D];break;case 'category':ClientUI.View.ConnectionsView.category=parseInt($0[$D]);break;}}var $7=new ClientUI.ViewModels.QueryParser(['connection']);$7.getView('connection',$4);$7.queryMetadata();var $8=$7.entityLookup['connection'];var $9=Object.keys($8.views)[0];var $A=$8.views[$9];ClientUI.View.ConnectionsView.vm=new ClientUI.ViewModel.ConnectionsViewModel($5,$6.split(','),$3,$A);var $B=new SparkleXrm.GridEditor.GridDataViewBinder();var $C=$A.columns;var $enum2=ss.IEnumerator.getEnumerator($C);while($enum2.moveNext()){var $E=$enum2.current;switch($E.field){case 'record2roleid':SparkleXrm.GridEditor.XrmLookupEditor.bindColumn($E,ss.Delegate.create(ClientUI.View.ConnectionsView.vm,ClientUI.View.ConnectionsView.vm.RoleSearchCommand),'connectionroleid','name,category','');break;case 'description':SparkleXrm.GridEditor.XrmTextEditor.bindColumn($E);break;case 'effectivestart':case 'effectiveend':SparkleXrm.GridEditor.XrmDateEditor.bindColumn($E,true);break;}}ClientUI.View.ConnectionsView.$0=$B.dataBindXrmGrid(ClientUI.View.ConnectionsView.vm.Connections,$C,'container','pager',true,false);ClientUI.View.ConnectionsView.$0.onActiveCellChanged.subscribe(function($p1_0,$p1_1){
var $1_0=$p1_1;ClientUI.View.ConnectionsView.vm.SelectedConnection(ClientUI.View.ConnectionsView.$0.getDataItem($1_0.row));});$B.bindClickHandler(ClientUI.View.ConnectionsView.$0);SparkleXrm.ViewBase.registerViewModel(ClientUI.View.ConnectionsView.vm);ClientUI.View.ConnectionsView.$3();$(window).resize(ClientUI.View.ConnectionsView.$4);$(function(){
ClientUI.View.ConnectionsView.$4(null);ClientUI.View.ConnectionsView.vm.search();});}
ClientUI.View.ConnectionsView.$2=function(){var $0=new Xrm.Sdk.EntityReference(new Xrm.Sdk.Guid(window.parent.Xrm.Page.data.entity.getId()),window.parent.Xrm.Page.data.entity.getEntityName(),null);if(window.parent.Xrm.Page.ui.getFormType()!==10*.1&&$0.id!=null){ClientUI.View.ConnectionsView.vm.parentRecordId($0);ClientUI.View.ConnectionsView.vm.search();}else{window.setTimeout(ClientUI.View.ConnectionsView.$2,1000);}}
ClientUI.View.ConnectionsView.$3=function(){var $0=Xrm.Sdk.Metadata.MetadataCache.getSmallIconUrl;var $1=function($p1_0){
switch($p1_0){case 'connectionrole':return '/_imgs/ico_16_3234.gif';default:return $0($p1_0);}};Xrm.Sdk.Metadata.MetadataCache.getSmallIconUrl=$1;}
ClientUI.View.ConnectionsView.$4=function($p0){var $0=$(window).height();var $1=$(window).width();$('#container').height($0-64).width($1-1);ClientUI.View.ConnectionsView.$0.resizeCanvas();}
ResourceStrings.registerClass('ResourceStrings');ClientUI.ViewModels.QueryParser.registerClass('ClientUI.ViewModels.QueryParser');ClientUI.View.GridPlugins.RowHoverPlugin.registerClass('ClientUI.View.GridPlugins.RowHoverPlugin',null,Object);ClientUI.Model.Connection.registerClass('ClientUI.Model.Connection',Xrm.Sdk.Entity);ClientUI.ViewModel.ConnectionsViewModel.registerClass('ClientUI.ViewModel.ConnectionsViewModel',SparkleXrm.ViewModelBase);ClientUI.ViewModel.ObservableConnection.registerClass('ClientUI.ViewModel.ObservableConnection',SparkleXrm.ViewModelBase);ClientUI.View.ConnectionsView.registerClass('ClientUI.View.ConnectionsView');ResourceStrings.ConfirmDeleteSelectedConnection=null;ResourceStrings.ConfirmDeleteConnection=null;ResourceStrings.RequiredMessage=null;ResourceStrings.SaveButton=null;ResourceStrings.CancelButton=null;ResourceStrings.Connection_CollectionName=null;ResourceStrings.ConnectTo=null;ResourceStrings.Role=null;ClientUI.ViewModels.QueryParser.parentRecordPlaceholder='#ParentRecordPlaceholder#';ClientUI.Model.Connection.logicalName='connection';ClientUI.View.ConnectionsView.vm=null;ClientUI.View.ConnectionsView.$0=null;ClientUI.View.ConnectionsView.category=0;})(window.xrmjQuery);