class VotesController < ApplicationController

    def show
        @votes = @votes = Group.find(params[:id]).votes.joins(:character).select("*")
        render json: {votes: @votes}
    end

    def create

        @vote = Vote.where(voter_id: vote_params[:voter_id],
                        votee_id: vote_params[:votee_id],
                        group_id: vote_params[:group_id]).first
        @character = Character.where(name: vote_params[:character_id])

        if @vote
        #   @vote = Vote.update(@vote.id, character_id: vote_params[:character_id])
            @vote.update(character_id: vote_params[:character_id])
        else
          @vote = Vote.create(vote_params)
        end
        render json: {vote: @vote}
    end

    def finalize
        @group  = Group.find(params[:id])
        @group[:completed] = true
        render json: {success: @group.save}
    end

    def vote_params
      params.require(:vote).permit(:voter_id,
                                :votee_id,
                                :group_id,
                                :character)
    end
end
