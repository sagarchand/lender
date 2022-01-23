'use strict';

angular.module('testApp')
  .controller('lendersMaintenanceCtrl2', function ($scope, $rootScope, lendersService) {

   $scope.getLendersData = function() {
        $scope.loadingData = true;
        
        lendersService.getMaintenanceLog().then((response) => {
            $scope.lendersData = response.data;
        }).catch((e) => {
            $scope.lendersDataError = true;
        }).finally(() => {
            $scope.loadingData = false;
        })
   }

   $scope.tryLendersDataAgain = function() {
       $scope.lendersDataError = false;
       $scope.getLendersData();
   }

   $scope.editRow = function(entry) {
       $scope.entryOldData = angular.copy(entry);
       entry.isEditing = entry.isEditing ? !entry.isEditing : true;
   }

   $scope.cancelEditRow = function(entry, oldData) {
     //entry = oldData;
     entry.attributes.is_active = oldData.attributes.is_active;
     entry.isEditing = false;
     //$scope.$apply();
   }

   $scope.saveData = function(entry) {
       let entryDataToSave = angular.copy(entry);
       if(entryDataToSave.isEditing) delete entryDataToSave.isEditing;

        entry.saving = true;
        lendersService.saveData(entryDataToSave).then((response) => {
            //$scope.lendersData = response.data;
            
        }).catch((e) => {
            //catch error for save method
        }).finally(() => {
            entry.saving = false;
            entry.isEditing = false;
        })
   }

   $scope.getLendersData();
});
