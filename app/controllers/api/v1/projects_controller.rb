module Api
  module V1
    class ProjectsController < ApplicationController
      before_action :load_project, only: [:update, :destroy]
      respond_to :json

      def index
        respond_with(@projects = current_user.projects)
      end

      def create
        respond_with(:api, :v1, Project.create(project_params.merge(user: current_user)))
      end

      def update
        respond_with(:api, :v1, @project.update(project_params))
      end

      def destroy
        respond_with(:api, :v1, @project.destroy)
      end

      private

        def load_project
          @project = Project.find(params[:id])
        end

        def project_params
          params.require(:project).permit(:id, :name, :tasks)
        end
    end
  end
end
