app.factory('Attachment', ['$resource', function($resource){
  return $resource('/api/v1/comments/:comment_id/attachments/:id', { comment_id: '@comment_id', id: '@id' },
    {
      'update': { method: 'PATCH' }
    }
  );
}]);
