module Api
  module V1
    class TasksController < ApplicationController
      resource_description do
        short 'Task manager'
        api_versions 'v1'
        error 403, 'Forbidden action'

        description <<-EOS
          == Long description
           Example resource for rest api documentation
           These can now be accessed in <tt>shared/header</tt> with:
             Headline: <%= headline %>
             First name: <%= person.first_name %>

           If you need to find out whether a certain local variable has been
           assigned a value in a particular render call, you need to use the
           following pattern:

           <% if local_assigns.has_key? :headline %>
              Headline: <%= headline %>
           <% end %>

          Testing using <tt>defined? headline</tt> will not work. This is an
          implementation restriction.

          === Template caching

          By default, Rails will compile each template to a method in order
          to render it. When you alter a template, Rails will check the
          file's modification time and recompile it in development mode.
        EOS
      end

      load_and_authorize_resource :project
      load_and_authorize_resource :task

      api!
      error 404, 'Task not found.'
      def create
        respond_with(:api, :v1, @project.tasks.create(task_params))
      end

      api!
      def update
        respond_with(:api, :v1, @task.update(task_params))
      end

      api!
      def destroy
        respond_with(:api, :v1, @task.destroy)
      end

      private

        def task_params
          params.permit(:id, :title, :position, :project_id, :completed, :end_date)
        end
    end
  end
end
