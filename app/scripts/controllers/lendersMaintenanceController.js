'use strict';

angular.module('testApp')
  .controller('lendersMaintenanceCtrl', function ($scope, $rootScope, lendersService) {

   $scope.loadingData = true;

   $scope.showActiveBtn= function(val) {
     console.log(val);
      if(val) {
        return 'checked'
      } else {
        return ''
      }
   };

   $scope.getLendersData = function() {
    lendersService.getMaintenanceLog().then((response) => {
      response.data.map((entry) => {
        entry.edit = "Edit";
        return entry;
      })
      $scope.lendersData = response.data;
      var isActiveTemplate = '<input type="checkbox" {{grid.appScope.showActiveBtn(row.entity.attributes.is_active)}} >';
      $scope.lendersDataTable = {
        enableSorting: true,
        columnDefs: [
          // default
          { name: 'Bank Code', field: 'attributes.code', headerCellClass: 'header' },
          { name: 'Deisplay Name', field: 'attributes.name', headerCellClass: 'header'},
          { name:'Type',field: 'attributes.type', headerCellClass: 'header'},
          { name:'Upfront',field: 'attributes.upfont_commission', headerCellClass: 'header'},
          { name:'Trail High',field: 'attributes.high_trail_commission', headerCellClass: 'header'},
          { name:'Trail Low',field: 'attributes.low_trail_commission', headerCellClass: 'header'},
          { name:'Balance Multiplier',field: 'attributes.balance_multiplier', headerCellClass: 'header'},
          { name:'Active',field: 'attributes.is_active', headerCellClass: 'header', cellTemplate: isActiveTemplate},
          { name:'Hide',field: 'attributes.is_hidden', headerCellClass: 'header'},
          { name:'Edit',field: 'edit', headerCellClass: 'header', enableSorting: false, cellTemplate: '<div ng-click="editRow(attributes.id)">Edit</div>'},
        ]
      }
      $scope.lendersDataTable.data = $scope.lendersData;

    }).catch((e) => {
      $scope.errorLoading = true;
    }).finally(() => {
      $scope.loadingData = false;
    })
   }

   $scope.getLendersData();
});
