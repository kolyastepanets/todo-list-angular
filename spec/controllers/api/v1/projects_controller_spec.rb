require 'rails_helper'

RSpec.describe Api::V1::ProjectsController, type: :controller do
  let!(:projects) { create_list(:project, 2) }

  describe 'GET #index' do
    before { get :index, format: :json }

    it 'should return successful response' do
      expect(response).to be_success
    end

    it 'assigns all projects as @projects' do
      expect(assigns(:projects)).to match_array(projects)
    end
  end
end
