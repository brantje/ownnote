angular.module('templates-main', ['views/list.html', 'views/note/edit.html']);

angular.module('views/list.html', []).run(['$templateCache', function ($templateCache) {
  'use strict';
  $templateCache.put('views/list.html',
    '<div id="ownnote"><div id="controls"><div id="new" class="button indent" ng-click="newNote()">New</div><div id="newfile" class="newfile indent"><form id="createform" class="note-title-form"><input type="text" class="newfileinput" id="newfilename" value="note title" style="color: rgb(160, 160, 160)"><select id="groupname"><option value="">Not grouped</option><option value="_new">New group</option></select><input type="text" class="newgroupinput" id="newgroupname" placeholder="group title"> <button id="create" class="button">Create</button><div id="cancel" class="button">Cancel</div></form></div></div><table class="listingSort"><thead><tr><th class="notename filesort notesort"><div class="pointer sorttitle" id="sortname" ng-click="list_sorting.what = \'name\'; list_sorting.reverse = !list_sorting.reverse; ">Name</div><div class="sortarrow" ng-show="list_sorting.what === \'name\'" ng-class="{\'sortup\': list_sorting.reverse, \'sortdown\': !list_sorting.reverse }"></div></th><th class="actions"></th><th class="info modified notesort"><span class="pointer" ng-click="list_sorting.what = \'mtime\'; list_sorting.reverse = !list_sorting.reverse; ">Modified</span><div class="sortarrow" ng-show="list_sorting.what === \'mtime\'" ng-class="{\'sortup\': list_sorting.reverse === true, \'sortdown\': !list_sorting.reverse }"></div></th></tr></thead><tbody><tr class="listing" ng-repeat="note in localNoteList | noteGroupFilter:noteGroupFilter | filter:list_filter | orderBy:list_sorting.what:list_sorting.reverse"><td title="{{ note.title }}" p="undefined" class="file pointer" ng-click="editNote(note)">{{ note.title }}</td><td class="actions" ng-if="list_filter.deleted === 0"><div id="note-{{ note.id }}-sdelete" class="buttons delete-note" ng-click="deleteNote(note)"><span tooltip="Delete note" class="pointer buttons delete"></span></div><div id="note-{{ note.id }}-edit" class="buttons edit-note" ng-click="editNote(note)"><span class="pointer buttons edit" tooltip="Edit note"></span></div></td><td class="actions" ng-if="list_filter.deleted === 1"><div id="note-{{ note.id }}-delete" class="buttons delete pointer" ng-click="deleteNote(note)"><span tooltip="Delete note" class="delete-note"></span></div><div id="note-{{ note.id }}-restore" class="buttons pointer restore-note" tooltip="Restore note" ng-click="resotoreNote(note)"></div></td><td class="info"><div class="modified"><span tooltip="{{ note.mtime | date:dateFormatLong}}">{{ note.mtime | timeAgo}}</span></div></td></tr></tbody></table></div>');
}]);

angular.module('views/note/edit.html', []).run(['$templateCache', function ($templateCache) {
  'use strict';
  $templateCache.put('views/note/edit.html',
    '<div id="ownnote" class="edit-note-container"><div id="controls"><span id="newfile" class="indent">Name: <input type="text" class="fileinput" ng-model="noteShadowCopy.title"> &nbsp;&nbsp; Group:<select id="groupname" ng-model="noteShadowCopy.grouping"><option value="">Not grouped</option><option value="_new">New group</option><option ng-repeat="group in note_groups" value="{{group.name}}">{{group.name}}</option></select><input type="text" placeholder="group title" ng-show="noteShadowCopy.grouping === \'_new\'" ng-model="new_group"><div class="button" ng-click="saveNote()">Save</div><div id="canceledit" class="button" ng-click="cancelEdit()">Cancel</div><div class="pull-right autosave" ng-class="{\'shown\': autoSaved }">Saved!</div></span></div><textarea ui-tinymce="tinymceOptions" ng-model="noteShadowCopy.content">\n' +
    '  \n' +
    '	</textarea></div>');
}]);
