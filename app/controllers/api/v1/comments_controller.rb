module Api
  module V1
    class CommentsController < ApplicationController
      load_and_authorize_resource :task
      load_and_authorize_resource :comment, through: :task, shallow: true

      def create
        respond_with(:api, :v1, @task.comments.create(comment_params))
      end

      def destroy
        respond_with(:api, :v1, @comment.destroy)
      end

      private

        def comment_params
          params.permit(:content)
        end
    end
  end
end
