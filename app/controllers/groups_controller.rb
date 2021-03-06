class GroupsController < ApplicationController
  def index
    respond_with Group.where(user_id: 1)
  end

  def show
    @group = Group.find(params[:id])
    @members = @group.users
    @votes = @group.votes.joins(:character).select("*")
    render json: {"group": @group, "members": @members, "votes": @votes}
  end

  def new
  end

  def create
    # respond_with Group.create(group_params)
    @group1 = Group.new(group_params)
    if @group1.valid?
      @group1.save
      respond_with @group1
    else
      puts @group1.errors.full_messages
      respond_with({ errors: @group1.errors.full_messages, status: :bad_request })
    end
  end

  def update
  end

  def invite
    @user = User.find_by_email(inv_params[:email])
    if @user
      if Member.where(user: @user, group_id: params[:id]).exists?
        render json: {error: "User has already been invited to this group"}
      else
        @member = Member.create(group_id: params[:id], user: @user)
        render json: {member: @user}
      end
    else
      render json: {error: "No such user exists"}
      # mailer for invite member to app
    end
  end

  def destroy
  end

  def results
      @results = Hash.new
      @members = Member.joins(:user).select("users.name, users.id").where(group_id: params[:group_id])

      for member in @members do
        @results[member.name] = Hash.new
        @results[member.name][:name] = member.name
        @results[member.name][:vote_info] = (Vote.joins(:character).select("*").where(group_id: params[:group_id], votee_id: member.id))

        @topVotes = Vote.group(:character_id).where(votee_id: member.id, group_id: params[:group_id]).count(:character_id)
        puts "TOP VOTES ***** TOP VOTES"
        puts @topVotes
      end

    render json: @results
  end

  def valid
    render json: User.find(params[:user_id]).groups_joined.exists?(id: params[:group_id]) || User.find(params[:user_id]).groups.exists?(id: params[:group_id])
  end

  private
    def group_params
      params.require(:group).permit(:name, :description, :user_id)
    end
    def inv_params
      params.require(:invite).permit(:email)
    end
end
