module Api
  module V1
    class ProjectsController < ApplicationController
      load_and_authorize_resource :project
      respond_to :json

      def index
        respond_with(:api, :v1, @projects = current_user.projects)
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

        def project_params
          params.require(:project).permit(:name)
        end
    end
  end
end
