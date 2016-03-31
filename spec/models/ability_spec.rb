require 'rails_helper'

describe Ability do
  subject(:ability) { Ability.new(user) }

  describe 'for guest' do
    let(:user) { nil }
    let(:project) { create(:project) }
    let(:task) { create(:task) }
    let(:comment) { create(:comment) }
    let(:attachment) { create(:attachment) }

    it { should_not be_able_to :manage, project }
    it { should_not be_able_to :manage, task }
    it { should_not be_able_to :manage, comment }
    it { should_not be_able_to :manage, attachment }
  end

  describe 'for user' do
    let(:user) { create :user }
    let(:other_user) { create :user }

    let(:project) { create(:project, user: user) }
    let(:other_project) { create(:project, user: other_user) }

    let(:task) { create(:task, project: project) }
    let(:other_task) { create(:task, project: other_project) }

    let(:comment) { create(:comment, task: task) }
    let(:other_comment) { create(:comment, task: other_task) }

    let(:attachment) { create(:attachment, comment: comment) }
    let(:other_attachment) { create(:attachment, comment: other_comment) }

    it { should be_able_to :manage, project }
    it { should_not be_able_to :manage, other_project }

    it { should be_able_to :manage, task }
    it { should_not be_able_to :manage, other_task }

    it { should be_able_to :manage, comment }
    it { should_not be_able_to :manage, other_comment }

    it { should be_able_to :manage, attachment }
    it { should_not be_able_to :manage, other_attachment }
  end

end
