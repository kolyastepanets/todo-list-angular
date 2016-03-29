app.factory('Comment', ['$resource', function($resource){
  return $resource('/api/v1/tasks/:task_id/comments/:id', { task_id: '@task_id', id: '@id' },
    {
      'destroy': { method: 'DELETE' }
    }
  );
}]);
