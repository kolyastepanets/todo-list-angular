module Api
  module V1
    class ProjectsController < ApplicationController
      resource_description do
        short 'Project manager'
        api_versions 'v1'
        error 403, 'Forbidden action'
      end

      load_and_authorize_resource :project


      api! 'Show list of projects'
      def index
        respond_with(:api, :v1, @projects = current_user.projects)
      end

      api! 'Create a project'
      param :project, Hash, desc: "Project info" do
        param :name, String, desc: 'Name', required: true
      end
      error 404, 'Project not found.'
      def create
        respond_with(:api, :v1, Project.create(project_params.merge(user: current_user)))
      end

      api! "Update a project"
      def update
        respond_with(:api, :v1, @project.update(project_params))
      end

      api! "Delete a project"
      def destroy
        respond_with(:api, :v1, @project.destroy)
      end

      private

        def project_params
          params.permit(:name)
        end
    end
  end
end
