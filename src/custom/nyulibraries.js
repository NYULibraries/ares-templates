$(function() {
    $('input[type="text"], input[type="checkbox"]').not('[aria-label]').each( function() { $(this).attr('aria-label', $(this).attr('title')) } );
    $('input[type="checkbox"]').not('[aria-label]').each( function() { $(this).attr('aria-label', $(this).attr('aria-description')) } );
    $('input[aria-description]').each( function() { $(this).removeAttr('aria-description') });
    $('#ItemTable').find('[id^="ItemTags"]').filter(':empty').html($('<span />').addClass('sr-only').html('no tags'));
    $('td:empty').each( function() { $(this).html($('<span />').addClass('sr-only').html('no content')) });
    $('th:empty').each( function() { $(this).html($('<span />').addClass('sr-only').html($(this).attr('aria-label'))) });
});