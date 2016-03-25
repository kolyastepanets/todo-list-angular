module Api
  module V1
    class CommentsController < ApplicationController
      before_action :load_task
      before_action :load_comment, only: [:destroy]
      respond_to :json

      def create
        respond_with(:api, :v1, @task, @task.comments.create(comments_params))
      end

      def destroy
        respond_with(:api, :v1, @comment.destroy)
      end

      private

        def load_comment
          @comment = Comment.find(params[:id])
        end

        def load_task
          @task = Task.find(params[:task_id])
        end

        def load_project
          @project = Project.find(params[:project_id])
        end

        def comments_params
          params.require(:comment).permit(:id, :content, :task_id)
        end
    end
  end
end
