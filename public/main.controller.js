app.controller('MainController', function ($scope, FlashCardsFactory, ScoreFactory) {
	
	// A promise is returned from the Factory, we need to wait and act on the promise.
	FlashCardsFactory.getFlashCards()
		.then(function (responseData) {
			$scope.flashCards = responseData;
	});

	$scope.answerQuestion = function (answer, flashCard) {
		if (!flashCard.answered) {
			flashCard.answered = true;
			flashCard.answeredCorrectly = answer.correct;
			if (flashCard.answeredCorrectly) {
				ScoreFactory.correct += 1;
			} else {
				ScoreFactory.incorrect += 1;
			}
		}
	}

	$scope.categories = [
	    {name: 'MongoDB'},
	    {name: 'Express'},
	    {name: 'Angular'},
	    {name: 'Node'}
	];

	$scope.getCategoryCards = function (category, index) {
		FlashCardsFactory.getFlashCards(category.name).then(function (responseData) {
			$scope.flashCards = responseData;
		});
		// category.active = true;
		$scope.selected = index;
	};

	$scope.selected = -1;

	$scope.removeCategory = function () {
		$scope.selected = -1;
		FlashCardsFactory.getFlashCards()
			.then(function (responseData) {
				$scope.flashCards = responseData;
		});
	}

});