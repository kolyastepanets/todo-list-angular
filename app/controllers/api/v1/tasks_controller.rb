module Api
  module V1
    class TasksController < ApplicationController
      before_action :load_project
      before_action :load_task, only: [:update, :destroy]
      respond_to :json

      def create
        respond_with(:api, :v1, @project, @project.tasks.create(task_params))
      end

      def update
        respond_with(:api, :v1, @task.update(task_params))
      end

      def destroy
        respond_with(:api, :v1, @task.destroy)
      end

      private

        def load_task
          @task = Task.find(params[:id])
        end

        def load_project
          @project = Project.find(params[:project_id])
        end

        def task_params
          params.require(:task).permit(:id, :title, :position, :project_id, :completed, :end_date)
        end
    end
  end
end
