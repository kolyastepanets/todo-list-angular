module Api
  module V1
    class ProjectsController < ApplicationController
      respond_to :json

      def index
        respond_with(Project.all.order("id ASC"))
      end

      def create
        # respond_with Post.create(post_params.merge(user_id: current_user.id))
        respond_with(:api, :v1, Project.create(project_params))
      end

      private

        def project_params
          params.require(:project).permit(:name)
        end
    end
  end
end
