module Api
  module V1
    class CommentsController < ApplicationController
      load_and_authorize_resource :task
      load_and_authorize_resource :comment, :through => :task
      respond_to :json

      def create
        respond_with(:api, :v1, @task, @task.comments.create(comment_params))
      end

      def destroy
        respond_with(:api, :v1, @comment.destroy)
      end

      private

        def comment_params
          params.require(:comment).permit(:content)
        end
    end
  end
end
