module Api
  module V1
    class AttachmentsController < ApplicationController
      # before_action :load_task
      before_action :load_comment
      respond_to :json

      def create
        respond_with(:api, :v1, @comment, @comment.attachments.create(attachment_params))
      end

      # def destroy
      #   respond_with(:api, :v1, @comment.destroy)
      # end

      private

        def load_comment
          @comment = Comment.find(params[:comment_id])
        end

        # def load_task
        #   @task = Task.find(params[:task_id])
        # end

        # def load_project
        #   @project = Project.find(params[:project_id])
        # end

        def attachment_params
          params.require(:file).permit(:file, :format, :comment_id)
        end
    end
  end
end
