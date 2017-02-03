class VotesController < ApplicationController

    def show
        @votes = Vote.where(group_id: params[:id])
        puts @votes
        render json: {votes: @votes}
    end

    def create

        @vote = Vote.where(voter_id: vote_params[:voter_id],
                        votee_id: vote_params[:votee_id],
                        group_id: vote_params[:group_id]).first
        if @vote
        #   @vote = Vote.update(@vote.id, character_id: vote_params[:character_id])
            @vote.update(character_id: vote_params[:character_id])
        else
          @vote = Vote.create(vote_params)
        end
        render json: {vote: @vote}
    end



    def vote_params
      params.require(:vote).permit(:voter_id,
                                :votee_id,
                                :group_id,
                                :character_id)
    end
end
