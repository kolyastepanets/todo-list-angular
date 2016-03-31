require 'rails_helper'

RSpec.describe Api::V1::AttachmentsController, type: :controller do
  let(:user) { create(:user) }
  let!(:project) { create(:project) }
  let!(:task) { create(:task, project: project) }
  let!(:comment) { create(:comment, task: task) }
  let!(:attachment) { create(:attachment, comment: comment) }

  before { allow(controller).to receive(:current_user).and_return(user) }

  sign_in_user
  ability

  describe "POST #create" do
    context 'saves attachment' do
      it 'saves new attachment' do
        post :create, comment_id: comment, file: { file: attachment.file }, format: :json
        expect(assigns(:attachment)).to_not be_nil
      end
    end

    context "does not save attachment" do
      it "forbids to create attachment" do
        @ability.cannot :create, Attachment
        post :create, comment_id: comment, file: { file: attachment.file }, format: :json
        expect(response).to be_forbidden
      end

      it 'has invalid params' do
        expect{ post :create, comment_id: comment,
                              file: { file: "" },
                              format: :json }.to_not change(Attachment, :count)
      end
    end
  end
end
