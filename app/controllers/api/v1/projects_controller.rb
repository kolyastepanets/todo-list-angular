module Api
  module V1
    class ProjectsController < ApplicationController
      before_action :load_project, only: [:update, :destroy]
      respond_to :json

      def index
        respond_with(:api, :v1, @projects = Project.all.order("id ASC"), include: { tasks: { include: 'comments'} })
      end

      def create
        # respond_with Post.create(post_params.merge(user_id: current_user.id))
        respond_with(:api, :v1, Project.create(project_params))
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
